import React, { useEffect, useState } from 'react'

const SnakeGame = () => {

    const GRID_SIZE = 20
    const CELL_SIZE = 20
    const INIT_SNAKE = [{ x: 5, y: 12}]
    const INIT_FOOD = { x: 10, y: 10}
    const INIT_DIRECTION = 'RIGHT'

    let [snake,setSnake] = useState(INIT_SNAKE)
    let [food,setFood] = useState(INIT_FOOD)
    let [direction,setDirection] = useState(INIT_DIRECTION)
    let [score,setScore] = useState(0)
    let [gameOver,setGameOver] = useState(false)

    function randomFood(){
        let newfood = {
            x : Math.floor(Math.random() * GRID_SIZE),
            y : Math.floor(Math.random() * GRID_SIZE)
        }
       return snake.some((snakepart)=> snakepart.x === newfood.x && snakepart.y === newfood.y ? randomFood() : newfood)
    }
 
    function moveSnake(){
        if (gameOver) return       
        let snakeHead = {...snake[0]}
        console.log("hello");
        

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
                break
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
    }

    useEffect(()=>{
        let handleKeyPress = (e)=>{
            console.log(direction);
            
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

        let loop = setInterval(moveSnake(),200);
        return () => { 
            clearInterval(loop)
        }

    },[snake, direction, gameOver])








    function renderGrid(){

        let grid = []
        for(let i = 0 ; i < GRID_SIZE ; i++){
            for(let j = 0 ; j < GRID_SIZE ; j++){

                let isSnake = snake.some((item)=>item.x === i && item.y === j)
                let isFood = food.x === i && food.y === j
                grid.push(<div key={`${i}-${j}`} className={`cell ${isSnake ? `snake`: ""} ${isFood ? `food` : ""}`}></div>)
            }
        }
        return grid
    }



  return (
    <div className='game-container'>
        <h3 className='score'>score : 0</h3>
        <div className="game-board" style={{
            gridTemplateColumns: `repeat(${GRID_SIZE},${CELL_SIZE}px)`,
            width: `${GRID_SIZE * CELL_SIZE}px`,
            height: `${GRID_SIZE * CELL_SIZE}px`
            }}>
            {renderGrid()}
        </div>
            

        {/* <div className="game-over">
            <h2>Game Over</h2>
            <p>Your score : 5</p>
            <button>restart</button>
        </div> */}
    </div>
  )
}

export default SnakeGame