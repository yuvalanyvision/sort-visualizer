class Algorithm:
    def __init__(self, socket):
        self.socket = socket

    def swap(self, func, list, a, b):
        list[a], list[b] = list[b], list[a]
        func(self, a, b)

    def bubblesort(self, func, list):
        for iter_num in range(len(list)-1, 0, -1):
            for idx in range(iter_num):
                if list[idx] > list[idx+1]:
                    self.swap(func, list, idx, idx+1)
        return list

    def merge_sort(self, func, list, l, r):
        def merge(func, list, start, mid, end):
            start2 = mid + 1
            if (list[mid] <= list[start2]):
                return
            while (start <= mid and start2 <= end):
                if (list[start] <= list[start2]):
                    start += 1

                else:
                    value = list[start2]
                    index = start2
                    while (index != start):
                        self.swap(func, list, index, index - 1)
                        index -= 1

                    #self.swap(func, list, start2, start)
                    list[start] = value
                    start += 1
                    mid += 1
                    start2 += 1

        if (l < r):
            m = l + (r - l) // 2
            self.merge_sort(func, list, l, m)
            self.merge_sort(func, list, m + 1, r)
            merge(func, list, l, m, r)
        return list
