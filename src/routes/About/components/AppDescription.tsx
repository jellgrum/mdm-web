import { Anchor, Paragraph } from '@/components/Typography';


export const AppDescription = () => (
    <>
        <Paragraph>
            Master data management (MDM) is a process for creating, maintaining, and
            distributing accurate, consistent, and comprehensive data. The goal of MDM
            is to help manage data assets by improving data quality, consistency,
            and accuracy, and providing a single, authoritative source of information.
        </Paragraph>

        <Paragraph>
            Master view (MV) refers to a single, centralized view of data assets
            that are used and trusted by an user. The master view serves as a single
            source of truth for data, ensuring that all business departments and
            processes have access to accurate, consistent, and up-to-date information.
            The master view can be used to drive business decisions,
            improve data quality, and increase operational efficiency.
        </Paragraph>

        <Paragraph>
            Detail view (DV) refers to a more detailed or granular view of specific
            data elements within a dataset. The detail view provides a more specific
            level of information or context about the data, which can be useful for
            analyzing and understanding the data in more detail. Typically,
            the detail view is derived from the master data and is used for detailed analysis,
            auditing, or reporting purposes.
        </Paragraph>

        <Paragraph>
            <Anchor href="https://en.wikipedia.org/wiki/Master_data_management">
                Wikipedia
            </Anchor>
        </Paragraph>
    </>
);
