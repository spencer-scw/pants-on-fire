import './PlayerList.css';

function PlayerList() {
	// TODO: get list of players from backend
	var playerNames = ['Jeff', 'Geoff', 'Djeff', 'Gef', 'Chef']
	const playerHTML = playerNames.map((name) => <div className='player'>{name}</div>)

  return (
	<div className="PlayerList">
		<div className="player_label">Players:</div>
		<div className="list">
			{playerHTML}
		</div>
	</div>
  );
}

export default PlayerList;