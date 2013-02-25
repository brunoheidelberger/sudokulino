function SudokuCtrl($scope) {
  $scope.initialize = function() {
    $scope.puzzle = new Puzzle($scope.dimension);
    $scope.rescale($scope.scale);
  };

  $scope.rescale = function() {
    var boxDimension = Math.sqrt($scope.dimension);

    var scale = $scope.scale;
    $scope.cellStyle = { 'width': scale + "px", 'height': scale + "px", 'font-size': scale * 0.6 + "px" };

    scale = (scale + 2) * boxDimension;
    $scope.boxStyle = { 'width': scale + "px", 'height': scale + "px" };

    scale = (scale + 2) * boxDimension;
    $scope.puzzleStyle = { 'width': scale + "px", 'height': scale + "px" };
  };

  (function() {
    $scope.scales = [
      { name: 'small', value: 20 },
      { name: 'medium', value: 30 },
      { name: 'large', value: 40 }
    ];
    $scope.scale = $scope.scales[1].value;

    $scope.dimensions = [
      { name: '1x1', value: 1 },
      { name: '2x2', value: 4 },
      { name: '3x3', value: 9 },
      { name: '4x4', value: 16 },
      { name: '5x5', value: 25 }
    ];
    $scope.dimension = $scope.dimensions[2].value;

    $scope.initialize();
  })();
};

