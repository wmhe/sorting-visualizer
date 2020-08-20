import checkSorted from './checkSorted';

export default function selectionSort(array) {
    var newArray = [...array];
    var animations = [];
    const length = newArray.length;
    var smallest = 1000, startIndex = 0, minIndex;
    for (let i = startIndex; i < length; ++i)
    {
        // found smallest or new smallest
        if (newArray[i] <= smallest) {
            smallest = newArray[i];
            minIndex = i;
        }
        // reached end of array
        if (i === length - 1) {
            var temp = newArray[startIndex];
            newArray[minIndex] = newArray[startIndex];
            newArray[startIndex] = temp;
            ++startIndex;
            i = startIndex;
            smallest = newArray[i];
            animations.push([startIndex, true, i]);
        }
        else if (checkSorted(newArray)) {
            break;
        }
        // one comparison complete
        else {
            animations.push([startIndex, false, i]);
        }
    }
    return [animations, newArray];
}
