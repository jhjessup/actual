import { SvgRefreshArrow } from '@actual-app/components/icons/v2';
import { theme } from '@actual-app/components/theme';

import type { TransactionEntity } from 'loot-core/types/models';

import type {
  TransactionEditFunction,
  TransactionUpdateFunction,
} from './table/utils';

import { Cell, CellButton } from '@desktop-client/components/table';

export type ReimbursableCellProps = {
  id: TransactionEntity['id'];
  reimbursable?: boolean;
  reimbursed?: boolean;
  focused?: boolean;
  isChild?: boolean;
  onEdit: TransactionEditFunction;
  onUpdate: TransactionUpdateFunction;
};

export function ReimbursableCell({
  id,
  reimbursable,
  reimbursed,
  focused,
  isChild,
  onEdit,
  onUpdate,
}: ReimbursableCellProps) {
  const isDisabled = reimbursed === true;

  function onSelect() {
    if (!isDisabled) {
      onUpdate('reimbursable', !reimbursable);
    }
  }

  const iconColor = reimbursed
    ? theme.noticeTextLight
    : reimbursable
      ? theme.pageTextLink
      : theme.pageTextSubdued;

  return (
    <Cell
      name="reimbursable"
      width={38}
      alignItems="center"
      focused={focused}
      style={{ padding: 1 }}
      plain
    >
      <CellButton
        style={{
          padding: 3,
          backgroundColor: 'transparent',
          border: '1px solid transparent',
          borderRadius: 50,
          ':focus': {
            ...(isDisabled
              ? { boxShadow: 'none' }
              : {
                  border: '1px solid ' + theme.formInputBorderSelected,
                  boxShadow: '0 1px 2px ' + theme.formInputBorderSelected,
                }),
          },
          cursor: isDisabled ? 'default' : 'pointer',
          opacity: isDisabled ? 0.5 : 1,
          ...(isChild && { visibility: 'hidden' }),
        }}
        disabled={isDisabled || isChild}
        onEdit={() => onEdit(id, 'reimbursable')}
        onSelect={onSelect}
      >
        <SvgRefreshArrow
          style={{
            width: 13,
            height: 13,
            color: iconColor,
          }}
        />
      </CellButton>
    </Cell>
  );
}
