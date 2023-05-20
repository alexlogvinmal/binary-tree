
приложение react + typescript  задача создать конструктор создания  бинарного дерева, должен быть главный узел у него есть две кнопки одна для создания узла справа другая для создания узла слева, у новых узлов так же должна быть возможность создавать дочерние узлы слева/справа и тд, после создания узла кнопка для его создания должна проподать у родителя (например после созданиия узла справа кнопка add right должна пропасть у родителя, так же и в случае если узел создоется слева у родителя должна пропасть кнопка add left) так же созданное бинарное дерево можно передвигать мышкой по всей странице


import { useState } from 'react';
import Draggable from 'react-draggable';

import './App.css'; // Импортируем файл со стилями

interface Node {
  id: number;
  name: string;
  left?: Node;
  right?: Node;
  position?: { x: number; y: number };
}

const App = () => {
  const [root, setRoot] = useState<Node | null>(null);

  const createNode = (parent: Node, side: 'left' | 'right') => {
    const newNode: Node = { id: Math.random(), name: '' };

    if (side === 'left') {
      parent.left = newNode;
      newNode.position = {
        x: parent.position ? parent.position.x - 150 : -150,
        y: parent.position ? parent.position.y + 100 : 100,
      };
    } else {
      parent.right = newNode;
      newNode.position = {
        x: parent.position ? parent.position.x + 150 : 150,
        y: parent.position ? parent.position.y + 100 : 100,
      };
    }

    setRoot({ ...root } as Node);
  };

  const renderNode = (node: Node) => {
    return (
      <Draggable
        key={node.id}
        position={node.position}
        onStop={(e, data) => handleDragStop(node, data)}
      >
        <div className="node">
          <input
            type="text"
            value={node.name}
            onChange={(e) => handleNameChange(node, e.target.value)}
          />
          <div className="buttons">
            <button
              onClick={() => createNode(node, 'left')}
              disabled={!!node.left}
            >
              Add Left
            </button>
            <button
              onClick={() => createNode(node, 'right')}
              disabled={!!node.right}
            >
              Add Right
            </button>
          </div>
          <div className="children">
            {node.left && renderNode(node.left)}
            {node.right && renderNode(node.right)}
          </div>
        </div>
      </Draggable>
    );
  };

  const handleNameChange = (node: Node, name: string) => {
    node.name = name;
    setRoot({ ...root } as Node);
  };

  const handleDragStop = (node: Node, data: any) => {
    node.position = { x: data.x, y: data.y };
    setRoot({ ...root } as Node);
  };

  return (
    <div className="app">
      <div className="tree-container">
        {root && renderNode(root)}
        {!root && (
          <button
            className="add-root-button"
            onClick={() => setRoot({ id: Math.random(), name: '' })}
          >
            Add Root Node
          </button>
        )}
      </div>
    </div>
  );
};

export default App;





.tree-container {
  position: relative;
}

.node {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  position: absolute;
  background-color: #fff;
}

.node input {
  margin-bottom: 10px;
}

.node button {
  margin: 5px;
}

.node.left {
  transform: translate(-50%, 0);
}

.node.right {
  transform: translate(50%, 0);
}

.node:before {
  content: '';
  display: block;
  width: 0;
  height: 100px;
  border-left: 1px solid #ccc;
  position: absolute;
  left: -1px;
  bottom: 0;
}

.node.left:before {
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
  transform: translateX(-50%);
}

.node.right:before {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  transform: translateX(50%);
}

.children {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
}
