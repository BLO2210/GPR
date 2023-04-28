num = [500, 6970, 3, 900]
largest = num[0]

for (i = 0; i < num.length;i++) {
    if (num[i] > largest) {
        largest = num [i];
    }
}

console.log(largest)