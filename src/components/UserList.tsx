import * as React from 'react';
import { HorizontalUserCard, SmallUserCard } from './UserCard';
import { SimpleUserInfo } from '@/interfaces/user';
import { Row, Col, Stack } from 'react-bootstrap';

const UserVerticalList = ({ users }: { users: SimpleUserInfo[] }) => {
    const cards = users.map((user, index) => (
        <HorizontalUserCard key={user.id} className={index >= 1 ? 'mt-2' : ''} user={user} />
    ));

    return <Stack>{cards}</Stack>;
};

const UserHorizontalList = ({ users }: { users: SimpleUserInfo[] }) => {
    const cards = users.map(user => (
        <Col key={user.id}>
            <SmallUserCard user={user} />
        </Col>
    ));

    return <Row xs="auto">{cards}</Row>;
};

export { UserVerticalList, UserHorizontalList };
