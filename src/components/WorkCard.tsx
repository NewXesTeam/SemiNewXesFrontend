// @ts-ignore
import React from 'react';
// @ts-ignore
import { getWorkLink } from '../utils.ts';
// @ts-ignore
import { Work } from '../interfaces/work.ts';
import { Card, Tooltip, Typography } from '@douyinfe/semi-ui';
import { Tag, Space } from '@douyinfe/semi-ui';
import { IconEyeOpened, IconLikeThumb, IconDislikeThumb, IconComment } from '@douyinfe/semi-icons';

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
                            width={324}
                            height={168}
                        />
                    }
                >
                    <Space spacing="tight" wrap>
                        <div className="d-flex justify-content-between align-items-center">
                            {/*<span style={{ fontSize: '12px' }}>*/}
                            <a href={author_url} target="_blank" style={{ maxWidth: '114px' }}>
                                <Tag size="large" color="yellow" style={{ fontSize: '14px' }}>
                                    {work.username}
                                </Tag>
                                {/*<span style={{ fontSize: '14px' }}>{work.username}</span>*/}
                            </a>
                            <span style={{ fontSize: '12px' }}>
                                <Tag color="cyan" size="small" shape="circle" prefixIcon={<IconEyeOpened />}>
                                    {work.views}
                                </Tag>
                                <Tag color="red" size="small" shape="circle" prefixIcon={<IconLikeThumb />}>
                                    {work.likes}
                                </Tag>
                                <Tag color="purple" size="small" shape="circle" prefixIcon={<IconDislikeThumb />}>
                                    {work.unlikes}
                                </Tag>
                                <Tag color="green" size="small" shape="circle" prefixIcon={<IconComment />}>
                                    {work.comments}
                                </Tag>
                                {/*👀{work.views} 👍{work.likes} 👎{work.unlikes} 💬{work.comments}*/}
                            </span>
                        </div>
                    </Space>
                    {/*</span>*/}
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
