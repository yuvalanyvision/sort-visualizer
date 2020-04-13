from flask_socketio import Namespace, emit, disconnect
from algorithms.algorithms_impl import Algorithm
from algorithms.algorithm_enum import SUPPORTED_ALGORITHMS


class Sort(Namespace):

    def on_connect(self):
        print("Connection has been made")

    def on_disconnect(self):
        pass

    # TODO: handle errors and get list from allowed algo list

    def on_sort(self, json):
        interval = 0.1
        algo_name = SUPPORTED_ALGORITHMS[0]
        data = json['data']
        arr = data['arr']
        if 'interval' in data:
            interval = data['interval']

        def emit_swap(self, a, b):
            emit('swap', {
                'swap': [a, b]
            })
            self.socket.sleep(interval)

        if 'algorithm' in data:
            algo_name = data['algorithm']

        algo = Algorithm(self.socketio)

        if algo_name in SUPPORTED_ALGORITHMS and algo_name == SUPPORTED_ALGORITHMS[1]:
            final = algo.merge_sort(emit_swap, arr, 0, len(arr) - 1)
        else:
            final = algo.bubblesort(emit_swap, arr)
        
        for _ in range(len(arr)):
            emit("final",  {
                'swap': [_]
            })
            self.socketio.sleep(interval)
        emit("final",  {
                'swap': []
            })
        disconnect()
