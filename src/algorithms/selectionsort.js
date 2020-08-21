// import checkSorted from './checkSorted';

export default function selectionSort(array) {
    var newArray = [...array];
    var animations = [];
    const length = newArray.length;
    var smallest = newArray[0], startIndex = 0, minIndex = startIndex, prevMin;
    for (let i = startIndex; i < length; ++i)
    {
        // found smallest or new smallest
        if (newArray[i] <= smallest) {
            smallest = newArray[i];
            prevMin = minIndex;
            minIndex = i;
            animations.push([startIndex, minIndex, prevMin]);
        }
        // reached end of array
        if (i === length - 1) {
            var temp = newArray[minIndex];
            newArray[minIndex] = newArray[startIndex];
            newArray[startIndex] = temp;
            animations.push([startIndex, minIndex, "end", i]);
            ++startIndex;
            i = startIndex;
            // counter loop increment
            --i;
            smallest = newArray[startIndex];
            minIndex = startIndex;
            prevMin = startIndex;
        }
    }
    return [animations, newArray];
}
