import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

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
  const skills = [
    { name: 'HTML+CSS', emoji: '👌', color: 'blue' },
    { name: 'JavaScript', emoji: '👌', color: 'yellow' },
    { name: 'Web Design', emoji: '👌', color: 'lightgreen' },
    { name: 'React', emoji: '👌', color: 'lightblue' },
    { name: 'Git and GitHub', emoji: '👌', color: 'grey' },
  ];

  return (
    <ul className="skill-list">
      {skills.map((skill) => (
        <Skill key={skill.name} skillObj={skill} />
      ))}
    </ul>
  );
}

function Skill({ skillObj }) {
  const { name, emoji, color } = skillObj;
  return (
    <li className="skill" style={{ backgroundColor: color }}>
      <span>{name}</span>
      <span>{emoji}</span>
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
