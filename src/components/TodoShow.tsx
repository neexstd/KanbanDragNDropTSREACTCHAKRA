import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardBody,
  Text,
  IconButton,
  Flex,
  Box,
  Input,
} from "@chakra-ui/react";
import { Todo } from "../interfaces/model";
import { MdDone, MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  todo: Todo;
  todos: Todo[];
  index: number;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoShow: React.FC<Props> = ({
  todo,
  todos,
  setTodo,
  setTodos,
  index,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.task);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = function (id: number) {
    setEdit(!edit);
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, task: editTodo };
        }
        return todo;
      })
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      })
    );
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEdit(todo.id);
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card mb={5}>
            <CardBody>
              <Flex
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                {edit && !todo.isDone ? (
                  <Input
                    ref={inputRef}
                    w="55%"
                    value={editTodo}
                    onChange={(e) => setEditTodo(e.target.value)}
                  />
                ) : (
                  <Text w="50%">
                    {todo.isDone ? <s>{todo.task}</s> : <>{todo.task}</>}
                  </Text>
                )}

                <Box>
                  {edit && !todo.isDone ? (
                    <></>
                  ) : (
                    <IconButton
                      onClick={() => handleDone(todo.id)}
                      aria-label="Done"
                      icon={<MdDone />}
                      m={2}
                    ></IconButton>
                  )}
                  <IconButton
                    onClick={() => handleDelete(todo.id)}
                    aria-label="Delete"
                    icon={<MdDeleteOutline />}
                    m={2}
                  ></IconButton>
                  <IconButton
                    aria-label="Edit"
                    icon={<FiEdit />}
                    m={2}
                    type="submit"
                  ></IconButton>
                </Box>
              </Flex>
            </CardBody>
          </Card>
        </form>
      )}
    </Draggable>
  );
};

export default TodoShow;
