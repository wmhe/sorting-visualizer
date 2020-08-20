import checkSorted from './checkSorted';

export default function bubbleSort(array) {
    var animations = [], temp;
    var newArray = [...array];
    while (!checkSorted(newArray))
    {
        for (let i = 0; i < newArray.length - 1; ++i)
        {
            if (newArray[i] > newArray[i + 1]) {
                temp = newArray[i];
                newArray[i] = newArray[i + 1];
                newArray[i + 1] = temp;
                // compare
                animations.push([i, i + 1, false]);
                // swap
                animations.push([i, i + 1]);
                // revert color
                animations.push([i, i + 1, true]);
            }
            else {
                // compare without swap/revert
                animations.push([i, i + 1, true]);
            }
        }
    }
    return [animations, newArray];
}