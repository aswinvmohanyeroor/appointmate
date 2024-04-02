import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import Iconify from '../components/iconify/Iconify';

const Faq = () => {
    return (
        <div style={{
            padding: '100px'
        }}>
            <Typography style={{
                marginBottom: '50px'
            }} variant="h4" gutterBottom>
                FAQ for Appointmate - Appointment Scheduling System
            </Typography>
            <Accordion>
                <AccordionSummary expandIcon={<Iconify
                    icon="eva:arrow-ios-downward-outline"
                ></Iconify>}>
                    <Typography>What is Appointmate?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Appointmate is a user-friendly appointment scheduling system designed to streamline scheduling tasks for Murdoch University staff.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<Iconify
                    icon="eva:arrow-ios-downward-outline"
                ></Iconify>}>
                    <Typography>How can Appointmate benefit Murdoch University staff?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Appointmate saves time, reduces errors, and enhances productivity by offering automated reminders, calendar integration, and easy appointment customization.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<Iconify
                    icon="eva:arrow-ios-downward-outline"
                ></Iconify>}>
                    <Typography>Is Appointmate easy to use?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Yes, Appointmate has an intuitive interface that simplifies scheduling tasks for Murdoch University staff without extensive training.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<Iconify
                    icon="eva:arrow-ios-downward-outline"
                ></Iconify>}>
                    <Typography>Can appointments be customized in Appointmate?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Yes, appointments in Appointmate can be customized based on duration, location and participants to meet specific needs.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<Iconify
                    icon="eva:arrow-ios-downward-outline"
                ></Iconify>}>
                    <Typography>Who can use Appointmate?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Staff members at Murdoch University can use Appointmate. The system administrator has the ability to create accounts for teachers, with login credentials sent via email for secure access.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<Iconify
                    icon="eva:arrow-ios-downward-outline"
                ></Iconify>}>
                    <Typography>How can students receive invitations in Appointmate?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Students can receive invitations via email in Appointmate. Administrators can retrieve student emails from an Excel file and send batch invitations efficiently.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<Iconify
                    icon="eva:arrow-ios-downward-outline"
                ></Iconify>}>
                    <Typography>Can invitations be sent to batches of students in Appointmate?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Yes, administrators can send invitations to batches of students in Appointmate, streamlining the process of scheduling appointments and events for student groups.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Faq;