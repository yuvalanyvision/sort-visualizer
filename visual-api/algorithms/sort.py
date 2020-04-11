from flask_socketio import Namespace, emit, disconnect
from algorithms.algorithms_impl import Algorithm


class Sort(Namespace):

    def on_connect(self):
        print("Connection has been made")

    def on_disconnect(self):
        pass

    # TODO: handle errors and get list from allowed algo list

    def on_sort(self, json):
        interval = 0.1
        data = json['data']
        arr = data['arr']
        if 'interval' in data:
            interval = data['interval']
            
        def emit_swap(self, a, b):
            emit('swap', {
                'swap': [a, b]
            })
            self.socket.sleep(interval)

        algo = Algorithm(self.socketio)

        if data['algorithm'] == 'Merge Sort':
            final = algo.merge_sort(emit_swap, arr, 0, len(arr) - 1)
        else:
            final = algo.bubblesort(emit_swap, arr)
        emit("final", final)
