import './PlayerList.css';

function PlayerList() {
	// TODO: get list of players
	var playerNames = ['Jeff', 'Geoff', 'Djeff', 'Jeffrey', 'Chef']
	const playerHTML = playerNames.map((name) => <div className='player'>{name}</div>)

  return (
	<div className="PlayerList">
		<div className="list">
			{playerHTML}
		</div>
	</div>
  );
}

export default PlayerList;