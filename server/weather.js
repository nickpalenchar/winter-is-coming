//pure, unadulterated functions only.
//***should only need to call the `generateMessage` function
var chalk = require('chalk');
var weather = {

    whenIsWinterComing: function (weatherObject) {
        var winterStartsAt = weatherObject.hourly.data.map(function (item, idx, arr) {
                var max = 0;

                for (var i = 0; true; i++) {
                    var curr = arr[idx + i],
                        next = arr[idx + i + 1] || {temperature: Infinity};
                    //console.log("comparing ", curr.temperature, " & ", next.temperature);
                    if (!next) break;
                    if (next.temperature > curr.temperature) {
                        break;
                    }
                    max++;
                }
                var itemToReturn = item;
                itemToReturn.coldStreak = max;
                return itemToReturn;
            })
            .reduce(function(prev, cur){return prev.coldStreak > cur.coldStreak ? prev : cur}, {coldStreak: -Infinity});

        //winterStartsAt.time = new Date(winterStartsAt.time);

        return "Winter is comming at " + new Date(winterStartsAt.time * 1000) +
            "\nWill get increasingly colder for " + winterStartsAt.coldStreak + " hours)";
        },

    whenShouldWeBraceOurselves: function (weatherObject) {
        var coldestHour = weatherObject.hourly.data.reduce(function(prev, cur) {return prev.temperature < cur.temperature ? prev : cur}, -Infinity);

        //coldestHour.time = new Date(coldestHour.time);

        return "You should brace yourselves at "
            + new Date(coldestHour.time * 1000) +
            "\n(coldest felt hour, at " + coldestHour.temperature + ")";
    },

    generateMessage: function (weatherObject) {
        return weather.whenShouldWeBraceOurselves(weatherObject) + "\n\n" + weather.whenIsWinterComing(weatherObject);
    }
}

module.exports = weather;

