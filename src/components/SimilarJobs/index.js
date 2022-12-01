import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="similar-item">
      <div className="title-description-location-container">
        <div className="jobs-image-title-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
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
        <h1 className="similar-heading">Description</h1>
        <p className="similar-description">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobs
