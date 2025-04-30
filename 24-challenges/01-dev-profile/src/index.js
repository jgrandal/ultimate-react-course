import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const skills = [
  { skill: 'HTML+CSS', level: 'advanced', color: 'blue' },
  { skill: 'JavaScript', level: 'advanced', color: 'yellow' },
  { skill: 'Web Design', level: 'intermediate', color: 'lightgreen' },
  { skill: 'React', level: 'intermediate', color: 'lightblue' },
  { skill: 'Git and GitHub', level: 'beginner', color: 'grey' },
];

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/eUijyrx.png"
      alt="Avatar"
    />
  );
}

function Intro() {
  return (
    <div>
      <h1>Jorge Granda</h1>
      <p>
        Full-stack web developer and consultant at WiQU. When not coding or
        consulting, I enjoy playing video games and watching new courses.
      </p>
    </div>
  );
}

function SkillList() {
  return (
    <ul className="skill-list">
      {skills.map((skill) => (
        <Skill key={skill.skill} skillObj={skill} />
      ))}
    </ul>
  );
}

function Skill({ skillObj }) {
  const { skill, level, color } = skillObj;
  return (
    <li className="skill" style={{ backgroundColor: color }}>
      <span>{skill}</span>
      {/* <span>
        {level === 'advanced' && '💪'}
        {level === 'intermediate' && '👌'}
        {level === 'beginner' && '👶'}
      </span> */}
      <span>
        {level === 'advanced'
          ? '💪'
          : level === 'intermediate'
          ? '👌'
          : level === 'beginner'
          ? '👶'
          : ''}
      </span>
    </li>
  );
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
