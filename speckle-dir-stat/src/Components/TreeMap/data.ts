import {EntityLeafNode, EntityTreeNode} from "./EntityLeafNode";

export default function speckleTestData() {

    let leaf1: EntityLeafNode = {
        speckle_type: 'Objects.Geometry.Mesh',
        size : 10,
        id : '1234'
    }

    let leaf2: EntityLeafNode = {
        speckle_type: 'Objects.Geometry.Mesh',
        size : 20,
        id : '1234'
    }

    let leaf3: EntityLeafNode = {
        speckle_type: 'Objects.Geometry.Mesh',
        size : 30,
        id : '1234'
    }

    let node: EntityTreeNode = {
        name: 'MeshTree',
        children: [leaf1,leaf2,leaf3]
    };

    return node;
}


const data = {
    name: 'Commit',
    children: [
        {
            name: 'Guards',
            children: [
                {
                    category: 'Guards',
                    name: 'Kemba Walker',
                    value: 20.4,
                },
                {
                    category: 'Guards',
                    name: 'Marcus Smart',
                    value: 12.9,
                },
                {
                    category: 'Guards',
                    name: 'Brad Wanamaker',
                    value: 6.9,
                },
                {
                    category: 'Guards',
                    name: 'Tremont Waters',
                    value: 3.6,
                },
                {
                    category: 'Guards',
                    name: 'Carsen Edwards',
                    value: 3.3,
                },
                {
                    category: 'Guards',
                    name: 'Romeo Langford',
                    value: 2.5,
                },
            ],
        },
        {
            name: 'Forwards',
            children: [
                {
                    category: 'Forwards',
                    name: 'Jayson Tatum',
                    value: 23.4,
                },
                {
                    category: 'Forwards',
                    name: 'Jaylen Brown',
                    value: 20.3,
                },
                {
                    category: 'Forwards',
                    name: 'Gordon Hayward',
                    value: 17.5,
                },
                {
                    category: 'Forwards',
                    name: 'Grant Williams',
                    value: 3.4,
                },
                {
                    category: 'Forwards',
                    name: 'Javonte Green',
                    value: 3.4,
                },
                {
                    category: 'Forwards',
                    name: 'Semi Ojeleye',
                    value: 3.4,
                },
                {
                    category: 'Forwards',
                    name: 'Vincent Poirier',
                    value: 1.9,
                },
            ],
        },
        {
            name: 'Centers',
            children: [
                {
                    category: 'Centers',
                    name: 'Daniel Theis',
                    value: 9.2,
                },
                {
                    category: 'Centers',
                    name: 'Enes Kanter',
                    value: 8.1,
                },
                {
                    category: 'Centers',
                    name: 'Robert Williams III',
                    value: 5.2,
                },
                {
                    category: 'Centers',
                    name: 'Tacko Fall',
                    value: 3.3,
                },
            ],
        },
    ],
};

// export default data;
