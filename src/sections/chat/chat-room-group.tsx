import type { IChatParticipant } from 'src/types/chat';

import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';

import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useBoolean } from 'minimal-shared/hooks';
import { useState, useCallback } from 'react';

import { ChatRoomParticipantDialog } from './chat-room-participant-dialog';
import { CollapseButton } from './styles';

// ----------------------------------------------------------------------

type Props = {
  participants: IChatParticipant[];
};

export function ChatRoomGroup({ participants }: Props) {
  const collapse = useBoolean(true);

  const [selected, setSelected] = useState<IChatParticipant | null>(null);

  const handleOpen = useCallback((participant: IChatParticipant) => {
    setSelected(participant);
  }, []);

  const handleClose = useCallback(() => {
    setSelected(null);
  }, []);

  const totalParticipants = participants.length;

  const renderList = () => (
    <>
      {participants.map((participant) => (
        <ListItemButton key={participant.id} onClick={() => handleOpen(participant)}>
          <Badge variant={participant.status} badgeContent="">
            <Avatar alt={participant.name} src={participant.avatarUrl} />
          </Badge>

          <ListItemText
            primary={participant.name}
            secondary={participant.role}
            slotProps={{
              primary: { noWrap: true },
              secondary: { noWrap: true, sx: { typography: 'caption' } },
            }}
            sx={{ ml: 2 }}
          />
        </ListItemButton>
      ))}
    </>
  );

  return (
    <>
      <CollapseButton
        selected={collapse.value}
        disabled={!totalParticipants}
        onClick={collapse.onToggle}
      >
        {`In room (${totalParticipants})`}
      </CollapseButton>

      <Collapse in={collapse.value}>{renderList()}</Collapse>

      {selected && (
        <ChatRoomParticipantDialog participant={selected} open={!!selected} onClose={handleClose} />
      )}
    </>
  );
}
