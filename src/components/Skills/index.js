import './index.css'

const Skills = props => {
  const {skillsDetails} = props
  const {name, imageUrl} = skillsDetails

  return (
    <li className="skills-item">
      <img src={imageUrl} alt={name} className="skills-image" />
      <p className="skills-text">{name}</p>
    </li>
  )
}

export default Skills
