import styled from 'styled-components';
import useTweet from '../../../hooks/useTweet';
import TweetForm from '../Tweet/TweetForm';

// component for top home content tweet form
const Container = styled.div`
  padding: 15px;
`

export default function CreateTweetTop() {
    const createTweet = useTweet();

    const onSubmit = async (text) => {
        createTweet(text);
    }

    return (
        <Container>
            <TweetForm placeholder="What's happening?" onSubmit={onSubmit} />
        </Container>
    )
}