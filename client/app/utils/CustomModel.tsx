import React from 'react'
import { Modal, Box } from "@mui/material"
type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: any;
    component: any;
    setRoute?: (route: string) => void;
}

const CustomModel = ({open,setOpen,setRoute, component:Component}: Props) => {
  return (
    <Modal
    open={open}
    onClose={() => setOpen(false)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
        <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[95%] m-auto  800px:w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
            <Component setRoute={setRoute} setOpen={setOpen}/>
        </Box>
    </Modal>
  )
}

export default CustomModel