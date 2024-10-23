const Table = require('cli-table3');
let {data} = require('./data.js');
// data = JSON.parse(data);



// Extract unique skill_ids and sv_entity_ids
const skillIds = data.map(item => item.skill_id);
const entityIds = [...new Set(data.flatMap(item => item.array_agg.map(vote => vote.sv_entity_id)))];

// Create table headers with skills as columns
const table = new Table({
  head: ['Entity ID', ...skillIds],
  colWidths: [40, ...Array(skillIds.length).fill(10)]
});

// Fill the table rows by entity ID
entityIds.forEach(entityId => {
  const row = [entityId];
  
  skillIds.forEach(skillId => {
    const skillVotes = data.find(skill => skill.skill_id === skillId).array_agg;
    const vote = skillVotes.find(vote => vote.sv_entity_id === entityId);

    row.push(vote ? (vote.voted_as === 'PRESENT' ? '✅' : '❌') : '-');
  });

  table.push(row);
});

// Output the table
console.log(table.toString());
