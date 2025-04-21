import React, { useEffect, useState } from 'react'

const SnakeGame = () => {

    const GRID_SIZE = 20
    const CELL_SIZE = 20
    const INIT_SNAKE = [{ x: 5, y: 10}]
    const INIT_FOOD = { x: 10, y: 10}
    const INIT_DIRECTION = "RIGHT"

    let [snake,setSnake] = useState(INIT_SNAKE)
    let [food,setFood] = useState(INIT_FOOD)
    let [direction,setDirection] = useState(INIT_DIRECTION)
    let [score,setScore] = useState(0)
    let [gameOver,setGameOver] = useState(false)
    let [isPause,setPause] = useState(false)

    function generateFood(){
        let newfood = {
            x : Math.floor(Math.random() * GRID_SIZE),
            y : Math.floor(Math.random() * GRID_SIZE)
        }
       return snake.some((snk)=> snk.x == newfood.x && snk.y == newfood.y) ? generateFood() : newfood
    }
 
    function moveSnake(){
        
        if (gameOver) return       
        let snakeHead = {...snake[0]}


        switch (direction) {
            case 'UP':
                snakeHead.y -= 1;
                break;
            case 'DOWN' :
                snakeHead.y += 1;
                break;
            case 'LEFT':
                snakeHead.x -= 1;
                break;
            case 'RIGHT':
                snakeHead.x += 1;
                break;   
        }
            if(
                snakeHead.x < 0 ||
                snakeHead.x >= GRID_SIZE ||
                snakeHead.y < 0 ||
                snakeHead.y >= GRID_SIZE ||
                snake.some((item)=> item.x === snakeHead.x && item.y === snakeHead.y)
            ){
                setGameOver(true)
                return
            }

            let newSnake = [snakeHead,...snake]
            
            if(snakeHead.x === food.x && snakeHead.y === food.y){
                setFood(generateFood())
                setScore(score + 1)
            }
            else{
                newSnake.pop()
            }

            setSnake(newSnake)    
    }

    useEffect(()=>{
        let handleKeyPress = (e)=>{
            
            switch (e.key) {
                case "ArrowUp":
                    if(direction !== "DOWN") setDirection("UP")
                    break;

                case "ArrowDown":
                    if(direction !== "UP") setDirection("DOWN")
                    break

                case "ArrowLeft":
                    if(direction !== "RIGHT") setDirection("LEFT")
                    break;

                case "ArrowRight":
                    if(direction !== "LEFT") setDirection("RIGHT")
                    break
            }}

            window.addEventListener('keydown', handleKeyPress)
            return ()=>{window.removeEventListener('keydown', handleKeyPress)}
       
       },[direction])
 

    useEffect(() => {

        if(isPause) return

        let loop = setInterval(moveSnake, (25 > score) ? 150 : (50 > score) ? 100 : 50 );
        return () => clearInterval(loop)

    },[snake,direction,isPause, gameOver])



    function renderGrid(){

        let grid = []
        for(let i = 0 ; i < GRID_SIZE ; i++){
            for(let j = 0 ; j < GRID_SIZE ; j++){

                let isSnake = snake.some((item)=> item.x === j && item.y === i  )
                let isFood = food.x === j && food.y === i 
                grid.push(<div key={`${i}-${j}`} className={`cell ${isSnake ? `snake`: ""} ${isFood ? `food` : ""}`}></div>)
            }
        }
        return grid
    }


   let  reStart = () => {
          setDirection(INIT_DIRECTION)
          setFood(INIT_FOOD)
          setSnake(INIT_SNAKE)
          setGameOver(false)
          setScore(0)
      }



  return (
    
    <>
    <h1 className='tittle'>snake game</h1>
    <div className='game-container'>
        <div className='btn-group'>
            <p className='score'>score : {score}</p>
            <button onClick={() => setPause(!isPause)}>Pause</button> 
        </div>
        <div className="game-board" style={{
            gridTemplateColumns: `repeat(${GRID_SIZE},${GRID_SIZE}px)`,
            width: `${GRID_SIZE * CELL_SIZE}px`,
            height: `${GRID_SIZE * CELL_SIZE}px`
            }}>
            {renderGrid()}
        </div>
            

        {gameOver &&
         <div className='game-over'>
            <h2>Game Over</h2>
            <p>Your score : {score}</p>
            <button onClick={()=> reStart()}>restart</button>
        
        </div> 
        }
    </div>
</>
  )
}

export default SnakeGame