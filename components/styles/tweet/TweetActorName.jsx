import { format } from 'date-fns';
import Link from 'next/link';
import styled from 'styled-components';

const TextBlock = styled.div`
    padding: 0;
    width: fit-content;
    margin-left: 10px;

    .user--name {
        color: white;
        font-weight: bold;
        font-size: 16px;
        &:hover {
            text-decoration: underline;
        }
    }

    .id--wrapper {
        display: flex;
        color: #777;
        font-size: 15px;
        margin-top: 2px;
        .separator {
            margin: 0px 5px;
            line-height: 8px;
            font-weight: 900;
        }
    }
`;


export default function TweetActorName({ time, name, id }) {
    const timeDiff = Date.now() - new Date(time).getTime()
  
    // convert ms to hours
    const hoursBetweenDates = timeDiff / (60 * 60 * 1000)
    const lessThan24hrs = hoursBetweenDates < 24
    const lessThan1hr = hoursBetweenDates < 1
  
    const timeText = lessThan1hr
      ? format(timeDiff, 'm') + 'm'
      : lessThan24hrs
      ? format(timeDiff, 'H') + 'h'
      : format(new Date(time), 'MMM d')
  
    return (
        <TextBlock>
            <Link href={`/${id}`}>
                <a onClick={(e) => e.stopPropagation()} className='tweet__actor-link'>
                    <span className="user--name">{name}</span>
                    <span className="id--wrapper">
                        <span className="user--id">@{id}</span>
                        <span className="separator">.</span>
                        <span className="tweet-date">{timeText}</span>
                    </span>
                </a>
            </Link>
        </TextBlock>
    )
}



