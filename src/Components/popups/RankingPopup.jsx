import React, { useState, useEffect } from 'react';
import '../../styles/ranking.css'; 
import {useAuth} from '../../AuthContext.jsx';

const RankingPopup = ({ onClose }) => {
  const { users } = useAuth();
  const [sortedUsers, setSortedUsers] = useState([]);
  
  useEffect(() => {
    if (Array.isArray(users)) {
      const sorted = [...users].sort((a, b) => {
        const totalScoreA = a.scores.normal + a.scores.crono + a.scores.flags + a.scores.capitals;
        const totalScoreB = b.scores.normal + b.scores.crono + b.scores.flags + b.scores.capitals;
        return totalScoreB - totalScoreA;
      });
      setSortedUsers(sorted);
    } else {
      setSortedUsers([]);
    }
  }, [users]);

  return (
    <div className="main-container">
      <div className="blur-background"></div>
      <div className="classification-popup">
        
        <h2>Ranking</h2>
        <div className='table'>
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Player</th>
                <th>Countries (Normal)</th>
                <th>Countries (Crono)</th>
                <th>Flags</th>
                <th>Capitals</th>
                <th>Total score</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.scores.normal}</td>
                  <td>{user.scores.crono}</td>
                  <td>{user.scores.flags}</td>
                  <td>{user.scores.capitals}</td>
                  <td>{user.scores.normal + user.scores.crono + user.scores.flags + user.scores.capitals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RankingPopup;

