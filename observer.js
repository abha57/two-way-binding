// observer pattern

const initialState = {
  name: 'apaar',
  surname: 'bhatnagar'
};

const Observer = function() {
  this.observers = [];
  this.state = { ...initialState };
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

  this.getState = () => {
    return this.state;
  }
  return {
    updateState: this.updateState,
    notifyObservers: this.notifyObservers,
    addObserver: this.addObserver,
    getState: this.getState
  };
};
