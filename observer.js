// observer pattern

const Observer = function() {
  this.observers = [];
  this.state = {};
  this.updateState = updateObj => {
    Object.keys(updateObj).map(key => {
      this.state = {
        ...this.state,
        [key]: updateObj[key]
      };
    });
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
