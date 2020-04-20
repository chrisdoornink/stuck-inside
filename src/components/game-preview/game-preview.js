import React from 'react';
import { useHistory } from 'react-router-dom';
import { GAME_STATUSES } from '../../helpers/constants';
import PlayerCard from '../player-card/player-card';
import './game-preview.css';
import Button from '../button/button';
import { auth } from 'firebase';

export default function GamePreview({ game, handleJoinGameClick }) {
  const user = auth().currentUser;
  const history = useHistory();

  const joinGame = (isUserInPlayersList) => {
    if (isUserInPlayersList) {
      history.push(`/game/${game.key}`);
    } else {
      handleJoinGameClick(game);
    }
  };

  const watchGame = () => {
    history.push(`/game/${game.key}`);
  };

  const isUserInPlayersList = !!game.players.find(
    (player) => player.uid === user.uid
  );

  return (
    <div className="game-preview">
      <h3>{game.players[0].displayName}’s New Game</h3>

      <div className="players-list">
        {game.players.slice(0, 4).map((player) => {
          return <PlayerCard size="small" player={player} />;
        })}

        {game.players.length > 4 && (
          <div className="and-more">...and {game.players.length - 4} more</div>
        )}
      </div>

      <div className="preview-bottom">
        {game.status === GAME_STATUSES.WAITING_TO_START && (
          <React.Fragment>
            <div className="status-message">
              This game will be starting soon
            </div>
            <Button onClick={() => joinGame(isUserInPlayersList)}>Join</Button>
          </React.Fragment>
        )}

        {game.status === GAME_STATUSES.IN_PROGRESS && (
          <React.Fragment>
            <div className="status-message">This game is in progress</div>
            <Button onClick={() => watchGame()}>Enter</Button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
