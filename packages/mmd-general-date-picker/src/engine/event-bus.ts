class EventBus {
  listeners: Array<{ event: string; callback: (data: unknown) => unknown }> = [];

  on(event: string, callback: (data: unknown) => unknown) {
    this.listeners.push({ event, callback });
  }

  emit(event: string, data: unknown) {
    this.listeners.forEach((listener) => {
      if (listener.event === event) {
        listener.callback(data);
      }
    });
  }
}

const eventBus = new EventBus();

export default eventBus;
