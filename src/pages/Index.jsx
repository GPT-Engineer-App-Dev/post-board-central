import { Box, Container, VStack, Text, Input, Textarea, Button, Flex, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { usePosts, useAddPost } from '../integrations/supabase/api';

const Index = () => {
  const { data: posts, isLoading, isError } = usePosts();
  const addPostMutation = useAddPost();
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPost.title && newPost.content) {
      addPostMutation.mutate({ title: newPost.title, body: newPost.content });
    }
  };

  useEffect(() => {
    if (addPostMutation.isSuccess) {
      setNewPost({ title: "", content: "" });
    }
  }, [addPostMutation.isSuccess]);

  return (
    <Box>
      <Box as="nav" bg="blue.500" color="white" p={4}>
        <Container maxW="container.lg">
          <Heading as="h1" size="lg">Public Post Board</Heading>
        </Container>
      </Box>
      <Container maxW="container.lg" py={4}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : isError ? (
          <Text>Error loading posts</Text>
        ) : (
          <VStack spacing={4} align="stretch">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Box key={post.id} p={4} shadow="md" borderWidth="1px" borderRadius="md">
                  <Heading as="h3" size="md">{post.title}</Heading>
                  <Text mt={2}>{post.body}</Text>
                </Box>
              ))
            ) : (
              <Text>No posts yet. Be the first to post!</Text>
            )}
          </VStack>
        )}
      </Container>
      <Box as="form" onSubmit={handleSubmit} bg="gray.100" p={4} position="fixed" bottom={0} width="100%">
        <Container maxW="container.lg">
          <VStack spacing={4}>
            <Input
              name="title"
              placeholder="Title"
              value={newPost.title}
              onChange={handleInputChange}
              isRequired
            />
            <Textarea
              name="content"
              placeholder="Content"
              value={newPost.content}
              onChange={handleInputChange}
              isRequired
            />
            <Button type="submit" colorScheme="blue" width="full" isLoading={addPostMutation.isLoading}>Submit Post</Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Index;