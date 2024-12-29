class Piece(object):
    def __init__(self, x, y, descr):
        self.x = x
        self.y = y
        self.shape = descr["forme"]
        self.color = descr["couleur"]
        self.rotation = 0
