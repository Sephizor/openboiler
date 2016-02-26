angular.module('openboiler').directive('d3daychart', [ '$rootScope', function ($rootScope) {
    return {
        restrict: 'E',
        link: function ($scope, elem, attrs) {
            var chart = d3.select('d3daychart');
            var margin = {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
            };
            var width = elem.parent().width() - margin.left - margin.right;
            var height = 400 - margin.top - margin.bottom;
            var x = d3.scale.linear().range([0, width]);
            var y = d3.scale.linear().range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient('bottom');

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient('left')

            var svg = chart.append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom);


            var resize = function () {
                width = elem.parent().width() - margin.left - margin.right;
                height = 400 - margin.top - margin.bottom;
            };

            var render = function (e, times) {
                svg.selectAll('*').remove();
                x.domain([0, 23]);
                y.domain([7, 30]);
                svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
                svg.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', `translate(0, ${height})`)
                    .call(xAxis);

                svg.append('g')
                    .attr('class', 'y axis')
                    .call(yAxis);

                svg.selectAll('.bar').data(times)
                    .enter()
                    .append('rect')
                    .attr('class', 'bar')
                    .attr('width', 40)
                    .attr('height', function (d) {
                        return height - y(d.temperature);
                    })
                    .attr('x', function (d) {
                        return x(d.hour);
                    })
                    .attr('y', function (d) {
                        return y(d.temperature);
                    });
            };

            elem.on('resize', resize);
            $rootScope.$on('RENDER_CHART', render);
        }
    };
}]);