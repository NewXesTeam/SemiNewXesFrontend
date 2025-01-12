import React from 'react';
import { getWorkLink } from '../utils.ts';
import { Work } from '../interfaces/work.ts';
import { Card, Tooltip, Typography } from '@douyinfe/semi-ui';

const WorkCard = ({ work }: { work: Work }) => {
    let link = getWorkLink(work);
    let author_url = `/space.html?user_id=${work.user_id}`;

    return (
        <Tooltip content={work.created_at} position="bottom">
            <a href={link} className="text-decoration-none" target="_blank">
                <Card
                    className="mb-3"
                    title={work.name}
                    cover={
                        <img
                            src={work.thumbnail}
                            className="card-img-top padding-5px"
                            alt={work.name}
                            width={224}
                            height={168}
                        />
                    }
                >
                    <a href={author_url} target="_blank">
                        <span style={{ fontSize: '14px' }}>{work.username}</span>
                    </a>
                    <span style={{ fontSize: '12px' }}>
                        👀{work.views} 👍{work.likes} 👎{work.unlikes}
                    </span>
                </Card>
            </a>
        </Tooltip>
    );
};

const RemovedWorkCard = () => {
    const { Title } = Typography;
    return (
        <Card>
            <Title heading={6} style={{ margin: 8 }}>
                    用户
            </Title>
        </Card>
    );
};

const SmallWorkCard = ({ work }: { work: Work }) => {
    return (
        <Tooltip
            position="bottom"
            content={
                <>
                    <span>
                        👀{work.views} 👍{work.likes} 👎{work.unlikes}
                    </span>
                    <br />
                    {work.created_at}
                </>
            }
        >
            <Card
                title={
                    <a href={getWorkLink(work)} className="stretched-link">
                        {work.name}
                    </a>
                }
                cover={<img src={work.thumbnail} height={138} className="m-auto" />}
            ></Card>
        </Tooltip>
    );
};

export default WorkCard;
export { RemovedWorkCard, SmallWorkCard };
