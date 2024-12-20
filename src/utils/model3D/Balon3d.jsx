/* eslint-disable react/no-unknown-property */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 balon3d.gltf
Author: LukeModels75 (https://sketchfab.com/lucasgamerbdf)
License: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
Source: https://sketchfab.com/3d-models/realistic-soccer-ball-68057e2c27414652baeca77cd5e0a20b
Title: Realistic Soccer Ball
*/

import { useGLTF } from '@react-three/drei'

export default function ModelBalon3d(props) {
  const { nodes, materials } = useGLTF('/models/balon3d.gltf')
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group position={[0, 100, 0]} rotation={[-1.213, 0.453, 0.058]} scale={100}>
          <mesh geometry={nodes.Icosphere_White001_0.geometry} material={materials['White.001']} />
          <mesh geometry={nodes.Icosphere_Black001_0.geometry} material={materials['Black.001']} />
        </group>
      </group>
    </group>
  )
}

// useGLTF.preload('/balon3d.gltf')
