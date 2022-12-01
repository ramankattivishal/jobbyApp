import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const profileApiConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN-PROGRESS',
}

class ProfileDetails extends Component {
  state = {
    profileStatus: profileApiConstant.initial,
    profileData: [],
  }

  componentDidMount() {
    this.profileData()
  }

  profileData = async () => {
    this.setState({
      profileStatus: profileApiConstant.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/profile'
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
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileData: updatedData,
        profileStatus: profileApiConstant.success,
      })
    } else {
      this.setState({profileStatus: profileApiConstant.failure})
    }
  }

  renderLoadingView = () => (
    <div className="profile-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileView = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="profile-error-view-container">
      <button
        type="button"
        className="profile-failure-button"
        onClick={this.profileData}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {profileStatus} = this.state

    switch (profileStatus) {
      case profileApiConstant.inProgress:
        return this.renderLoadingView()
      case profileApiConstant.success:
        return this.renderProfileView()
      case profileApiConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default ProfileDetails
