function Puzzle(dimension) {
  this.dimension = dimension;

  this.cells = (function(dimension) {
    var cells = [];
    for(var cellId = 0; cellId < dimension * dimension; ++cellId) {
      cells.push({
        value: null,
        state: null
      });
    }
    return cells;
  }(dimension));

  this.rows = (function(dimension) {
    var rows = [];
    for(var rowId = 0; rowId < dimension; ++rowId) {
      var row = [];
      for(var columnId = 0; columnId < dimension; ++columnId) {
        row.push(rowId * dimension + columnId);
      }
      rows.push(row);
    }
    return rows;
  }(dimension));

  this.columns = (function(dimension) {
    var columns = [];
    for(var columnId = 0; columnId < dimension; ++columnId) {
      var column = [];
      for(var rowId = 0; rowId < dimension; ++rowId) {
        column.push(rowId * dimension + columnId);
      }
      columns.push(column);
    }
    return columns;
  }(dimension));

  this.boxes = (function(dimension) {
    var boxDimension = Math.sqrt(dimension);
    var boxes = [];
    for(var boxRowId = 0; boxRowId < boxDimension; ++boxRowId) {
      for(var boxColumnId = 0; boxColumnId < boxDimension; ++boxColumnId) {
        var box = [];
        for(var rowId = 0; rowId < boxDimension; ++rowId) {
          for(var columnId = 0; columnId < boxDimension; ++columnId) {
            box.push((boxRowId * boxDimension + rowId) * dimension + (boxColumnId * boxDimension + columnId));
          }
        }
        boxes.push(box);
      }
    }
    return boxes;
  }(dimension));
};

Puzzle.prototype.STATES = [ "empty", "ok", "warning", "error" ];

Puzzle.prototype.validateCell = function(cell) {
  if(typeof cell.value != "number")
    cell.value = parseInt(cell.value);

  if(isNaN(cell.value) || (cell.value < 1) || (cell.value > this.dimension)) {
    cell.value = null;
    cell.state = Puzzle.prototype.STATES[0];
  }
  else {
    cell.state = Puzzle.prototype.STATES[1];
  }
}

Puzzle.prototype.validateUnit = function(unit) {
  var puzzle = this;

  valueSet = [];
  for(var valueId = 0; valueId < puzzle.dimension; ++valueId) {
    valueSet[valueId] = 0;
  }

  angular.forEach(unit, function(cellId) {
    var cell = puzzle.cells[cellId];
    if(cell.value != null) {
      valueSet[cell.value - 1] += 1;
    }
  });

  var isUnitValid = true;
  for(var valueId = 0; valueId < puzzle.dimension; ++valueId) {
    isUnitValid = isUnitValid && (valueSet[valueId] <= 1);
  }

  if(!isUnitValid) {
    angular.forEach(unit, function(cellId) {
      var cell = puzzle.cells[cellId];
      cell.state = Puzzle.prototype.STATES[2];

      if((cell.value != null) && (valueSet[cell.value - 1] > 1)) {
        cell.state = Puzzle.prototype.STATES[3];
      }
    });
  }
}

Puzzle.prototype.validate = function() {
  var puzzle = this;

  for(var cellId = 0; cellId < puzzle.dimension * puzzle.dimension; ++cellId)
    puzzle.validateCell(puzzle.cells[cellId]);

  angular.forEach(puzzle.rows, function(row) {
    puzzle.validateUnit(row);
  });

  angular.forEach(puzzle.columns, function(column) {
    puzzle.validateUnit(column);
  });

  angular.forEach(puzzle.boxes, function(box) {
    puzzle.validateUnit(box);
  });
}

