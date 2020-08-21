import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import bubbleSort from './algorithms/bubblesort';
import selectionSort from './algorithms/selectionsort';

const PRIMARY_COLOR = "indigo"; //starting color
const SECONDARY_COLOR = "red";

  class Display extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        array: [],
      };
    }

    componentDidMount() {
      this.createArray();
    }

    intFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    createArray() {
      const array = [];
      for (let i = 0; i < 70; ++i) {
        array.push(this.intFromInterval(5, 500));
      }
      this.setState({array});
    }

    testSelectionSort() {
      for (let i = 0; i < 1000; ++i)
      {
        const array = [];
        for (let i = 0; i < this.intFromInterval(1, 1000); ++i) {
          array.push(this.intFromInterval(1, 1000));  
        }
        const dotSort = array.sort((a,b) => a - b);
        const customSort = selectionSort(array)[1];
        console.log(this.arrayEquals(dotSort, customSort));
      }
    }

    arrayEquals(dotSort, customSort) {
      if (dotSort.length !== customSort.length) {
        return false;
      }
      
      for (let i = 0; i < dotSort.length; ++i) {
        if (dotSort[i] !== customSort[i]) {
          return false;
        }
      }
      return true;
    }

    selectionSort() {
      const newArray = [...this.state.array];
      const animations = selectionSort(newArray)[0];
      const bars = document.getElementsByClassName("num");
      bars[0].style.backgroundColor = SECONDARY_COLOR;
      for (let i = 0; i < animations.length; ++i)
      {
        const animation = animations[i];
        const swap = animation[2] === "end";
        if (swap) {
          setTimeout(() => {
            const height1 = bars[animation[1]].style.height;
            const height2 = bars[animation[0]].style.height;
            bars[animation[1]].style.height = height2;
            bars[animation[0]].style.height = height1;
            bars[animation[1]].style.backgroundColor = PRIMARY_COLOR;
            bars[animation[0]].style.backgroundColor = PRIMARY_COLOR;
          }, i * 100);
        }
        else if (animation.length > 1) {
          setTimeout(() => {
            if (animation[1] !== animation[2]) {
              bars[animation[1]].style.backgroundColor = SECONDARY_COLOR;
              bars[animation[2]].style.backgroundColor = PRIMARY_COLOR;
            }
          }, i * 100);
        }
      }
    }

    bubbleSort() {
      const newArray = [...this.state.array];
      const animations = bubbleSort(newArray)[0];
      const bars = document.getElementsByClassName("num");
      for (let i = 0; i < animations.length; ++i)
      {
        const animation = animations[i];
        const colorChange = animation.length === 3;
        if (colorChange) {
          setTimeout(() => {
            const color = animation[2] ? PRIMARY_COLOR : SECONDARY_COLOR;
            bars[animation[0]].style.backgroundColor = color;
            bars[animation[1]].style.backgroundColor = color;
          }, (i+1) * 10);
        }
        else {
          setTimeout(() => {
            const height1 = bars[animation[0]].style.height;
            const height2 = bars[animation[1]].style.height;
            bars[animation[0]].style.height = height2;
            bars[animation[1]].style.height = height1;
          }, (i+1) * 10);
        }
      }
    }
    
    render() {
      const array = this.state.array;

      return (
        <>
          <div className="arrayContainer">
            { array.map((number, ind) => 
                <div
                className="num" key={ind}
                style={{height: `${number}px`}}
                ></div>
              ) }
          </div>
          <div className="row">
            <div className="col text-center">
            <button className="btn btn-primary"
            onClick={() => this.bubbleSort()}
            >Bubble Sort
            </button>
            <button className="btn btn-primary"
            onClick={() => this.selectionSort()}
            >Selection Sort
            </button>
            <button className="btn btn-primary"
            onClick={() => this.createArray()}
            >Reset
            </button>
            </div>
          </div>
        </>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Display />,
    document.getElementById('root')
  );
  