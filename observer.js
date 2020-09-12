// observer pattern

const initialState = {
  name: 'This is the  initial state.',
  surname: 'This is the initial state.'
};

const Observer = function() {
  this.observers = [];
  this.state = {};
  this.updateState = updateObj => {
    if (Object.keys(updateObj).length === 0) {
      this.state = {
        ...initialState
      };
    } else {
      Object.keys(updateObj).map(key => {
        this.state = {
          ...this.state,
          [key]: updateObj[key]
        };
      });
    }
    this.notifyObservers();
  };
  this.notifyObservers = () => {
    if (this.observers.length > 0) {
      this.observers.forEach(observer => {
        observer(this.state);
      });
    }
  };
  this.addObserver = observer => {
    this.observers.push(observer);
    return () => {
      const index = this.observers.indexOf(observer);
      this.observers.splice(index, 1);
    };
  };
  return {
    updateState: this.updateState,
    notifyObservers: this.notifyObservers,
    addObserver: this.addObserver
  };
};
