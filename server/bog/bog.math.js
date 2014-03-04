module.exports = bog.Namespace('math', function () {
    var randomFromInterval = function (from, to) {
        return Math.random() * (to - from + 1) + from;
    };
});