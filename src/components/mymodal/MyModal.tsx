import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function MyModal({
  show,
  handleClose,
  handleAction,
  title,
  bodyText,
  textPrimaryButton,
  textSecondaryButton,
}: any) {
  return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {bodyText}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            {textSecondaryButton}
          </Button>
          <Button variant='danger' onClick={handleAction}>{textPrimaryButton}</Button>
        </Modal.Footer>
      </Modal>
  )
}
