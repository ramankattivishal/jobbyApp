import {BsSearch} from 'react-icons/bs'
import ProfileDetails from '../ProfileDetails'
import './index.css'

const FilteredGroup = props => {
  const {onChangeSearch, getJobsData} = props

  const onChangeSearchInput = event => {
    onChangeSearch(event)
  }

  const renderSearchInput = () => {
    const {searchInput} = props

    return (
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={onChangeSearchInput}
        />
        <button type="button" className="search-btn" onClick={getJobsData}>
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  const renderTypeOfEmployment = () => {
    const {employmentTypesList, changeEmployment} = props
    const selectEmploymentType = event => {
      changeEmployment(event.target.value)
    }

    return (
      <div className="employment-container">
        <h1 className="employment-heading">Type of Employment</h1>
        <ul className="employment-list">
          {employmentTypesList.map(eachEmployment => (
            <li
              className="employment-item"
              key={eachEmployment.employmentTypeId}
            >
              <input
                type="checkbox"
                id={eachEmployment.employmentTypeId}
                className="check-input"
                value={eachEmployment.employmentTypeId}
                onChange={selectEmploymentType}
              />
              <label
                htmlFor={eachEmployment.employmentTypeId}
                className="check-label"
              >
                {eachEmployment.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const renderSalaryType = () => {
    const {salaryRangesList, changeSalary} = props

    const selectSalaryType = event => {
      changeSalary(event.target.value)
    }

    return (
      <div className="employment-container">
        <h1 className="employment-heading">Salary Range</h1>
        <ul className="employment-list">
          {salaryRangesList.map(eachSalary => (
            <li className="employment-item" key={eachSalary.salaryRangeId}>
              <input
                type="radio"
                id={eachSalary.salaryRangeId}
                className="check-input"
                name="salary"
                value={eachSalary.salaryRangeId}
                onChange={selectSalaryType}
              />
              <label htmlFor={eachSalary.salaryRangeId} className="check-label">
                {eachSalary.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="filtered-group-container">
      {renderSearchInput()}
      <ProfileDetails />
      <hr className="line" />
      {renderTypeOfEmployment()}
      <hr className="line" />
      {renderSalaryType()}
    </div>
  )
}

export default FilteredGroup
