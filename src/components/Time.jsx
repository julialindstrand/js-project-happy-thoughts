import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import styled from "styled-components"

dayjs.extend(relativeTime)

export const Time = ({ createdAt }) => {
  return (
    <Span>{dayjs(createdAt).fromNow()}</Span>
  )
}

const Span = styled.span`
float: right;
`