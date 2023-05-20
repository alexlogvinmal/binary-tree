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
 const [isRootDraggable, setIsRootDraggable] = useState(true);

  const createNode = (parent: Node, side: 'left' | 'right') => {
    const newNode: Node = { id: Math.random(), name: '' };
    console.log(parent.position)
    if (side === 'left') {
      parent.left = newNode;
      newNode.position = {
        x: parent.position ? parent.position.x - 150 : -150,
        y: parent.position ? parent.position.y + 20 : 20,
      };
    } else {
      parent.right = newNode;
      newNode.position = {
        x: parent.position ? parent.position.x + 150 : 150,
        y: parent.position ? parent.position.y + 20 : 20,
      };
    }

    setRoot({ ...root } as Node);
    setIsRootDraggable(parent.left && parent.right ? false : true); // Разблокировать передвижение корневого узла
  };

  const renderNode = (node: Node) => {
    return (
      <Draggable
        key={node.id}
        position={node.position}
        onStop={(e, data) => handleDragStop(node, data)}
        disabled={isRootDraggable}
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
    if (!node.position) {
      node.position = { x: 0, y: 0 };
    }

    node.position.x = data.x;
    node.position.y = data.y;

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
