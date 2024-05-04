import React, { useState, useEffect } from "react";

const Display = () => {
  const [winners, setWinners] = useState({});
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/vote/winners");
        const data = await response.json();
        setVotes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const countVotes = () => {
    const voteCounts = {};
    votes.forEach((vote) => {
      const candidateId = vote.candidateId;
      if (voteCounts[candidateId]) {
        voteCounts[candidateId]++;
      } else {
        voteCounts[candidateId] = 1;
      }
    });
    return voteCounts;
  };

  useEffect(() => {
    const voteCounts = countVotes();
    const distinctRoles = [...new Set(votes.map((vote) => vote.roleName))];
    const dynamicWinners = {};

    distinctRoles.forEach((role) => {
      const roleWinners = votes.filter((vote) => vote.roleName === role);
      const groupedWinners = {};

      roleWinners.forEach((winner) => {
        const { candidateId } = winner;
        if (!groupedWinners[candidateId]) {
          groupedWinners[candidateId] = winner;
        }
      });

      dynamicWinners[role] = Object.values(groupedWinners);
    });

    setWinners(dynamicWinners);
  }, [votes]);

  return (
    <div className="container mx-auto mt-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Object.keys(winners).map((role) =>
        winners[role].map((winner, index) => {
          const { candidateName, candidateImage, candidateId } = winner;
          const imageUrl = `http://localhost:8080/images/${candidateImage}`;
          const totalVotes = votes.filter(
            (vote) => vote.candidateId === candidateId
          ).length;

          return (
            <div
              key={`${role}-${candidateId}-${index}`}
              className="winner-card bg-white rounded-lg shadow-md overflow-hidden mx-4"
            >
              <img
                src={imageUrl}
                alt={candidateName}
                className="w-full h-64 object-cover object-center"
              />
              <div className="winner-info p-4">
                <h3 className="text-lg font mb-2">
                  Name: {candidateName} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Role: {role}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">Total Votes:</p>
                  <p className="font-semibold">{totalVotes}</p>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Display;
