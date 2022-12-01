import Cookies from 'js-cookie'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobsCard from '../JobsCard'
import FilteredGroup from '../FilteredGroup'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    jobsData: [],
    employmentType: [],
    salaryRange: '',
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const {searchInput, employmentType, salaryRange} = this.state

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.jobs.map(eachJob => ({
        title: eachJob.title,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
      }))

      this.setState({
        jobsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsView = () => {
    const {jobsData} = this.state

    const renderJobs = jobsData.length > 0
    return renderJobs ? (
      <div className="all-jobs-container">
        <ul className="jobs-list">
          {jobsData.map(eachJob => (
            <JobsCard key={eachJob.id} jobsDetails={eachJob} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-heading">Oops! Something Went Wrong</h1>
      <p className="no-jobs-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="failure-btn" onClick={this.getJobsData}>
        Retry
      </button>
    </div>
  )

  renderViewBasedOnApi = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderJobsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeEmploymentType = value => {
    this.setState(
      prevState => ({
        employmentType: [...prevState.employmentType, value],
      }),
      this.getJobsData,
    )
  }

  onChangeSalaryType = value => {
    this.setState({salaryRange: value}, this.getJobsData)
  }

  render() {
    const {searchInput, jobsData} = this.state
    console.log(jobsData)
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="jobs-content">
            <FilteredGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              searchInput={searchInput}
              onChangeSearch={this.onChangeSearch}
              getJobsData={this.getJobsData}
              changeEmployment={this.onChangeEmploymentType}
              changeSalary={this.onChangeSalaryType}
            />
            <div className="search-input-job-container">
              <div className="search-input-desktop-container">
                <input
                  type="search"
                  className="search-input"
                  value={searchInput}
                  placeholder="Search"
                  onChange={this.onChangeSearch}
                />
                <button
                  type="button"
                  className="search-btn"
                  onClick={this.getJobsData}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.renderViewBasedOnApi()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
