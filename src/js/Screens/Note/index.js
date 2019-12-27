import React from 'react';
import TextArea from 'Components/TextArea'
import Link from 'Components/Link'

export default function Note () {
  return (
    <div>
      <Link type="header" name="id" autoCorrect="off" autoCapitalize="none" />
      <TextArea name="content" />
    </div>
  );
}

