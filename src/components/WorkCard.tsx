import * as React from 'react';
import { Card, Tooltip, Typography, Tag, Space } from '@douyinfe/semi-ui';
import { IconEyeOpened, IconLikeThumb, IconDislikeThumb, IconComment } from '@douyinfe/semi-icons';
import { getWorkLink } from '@/utils';
import { Work } from '@/interfaces/work';

const WorkCard = ({ work }: { work: Work }) => {
    let link = getWorkLink(work);
    let author_url = `/space.html?id=${work.user_id}`;

    return (
        <Tooltip content={work.created_at} position="bottom">
            <a href={link} className="text-decoration-none" target="_blank">
                <Card
                    className="mb-3"
                    title={work.name}
                    cover={
                        <img
                            src={
                              work.thumbnail ||
                              'https://static0-test.xesimg.com/programme/assets/c16477eaab146fbc22a050e2203f91b8.png'
                            }
                            className="card-img-top padding-5px"
                            alt={work.name}
                            width={224}
                            height={168}
                        />
                    }
                >
                    <Space spacing="tight" wrap>
                        <div className="d-flex justify-content-between align-items-center">
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
                        👀{work.views} 👍{work.likes} 👎{work.unlikes} 💬{work.comments}
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
                cover={<img src={work.thumbnail} height={138} className="m-auto" alt={work.name} />}
            ></Card>
        </Tooltip>
    );
};

export default WorkCard;
export { RemovedWorkCard, SmallWorkCard };
