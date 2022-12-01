import {Link} from 'react-router-dom'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobsCard = props => {
  const {jobsDetails} = props
  const {
    title,
    companyLogoUrl,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
    id,
  } = jobsDetails

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="jobs-item-container">
        <div className="jobs-title-location-container">
          <div className="jobs-image-title-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="title-rating-container">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <BsFillStarFill className="star-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-package-container">
            <div className="location-container">
              <div className="location-icons-container">
                <MdLocationOn className="icons-container" />
                <p className="location">{location}</p>
              </div>
              <div className="location-icons-container">
                <BsFillBriefcaseFill className="icons-container" />
                <p className="location">{employmentType}</p>
              </div>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="hr-line" />
        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsCard
